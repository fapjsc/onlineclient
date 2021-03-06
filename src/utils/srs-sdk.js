import axios from 'axios';

export const SrsRtcPlayerAsync = () => {
  let self = {};
 

  self.play = async (url) => {
    let conf = self.__internal.prepareUrl(url);

    self.pc.addTransceiver('audio', { direction: 'recvonly' });
    self.pc.addTransceiver('video', { direction: 'recvonly' });

    let offer = await self.pc.createOffer();

    await self.pc.setLocalDescription(offer);

    const session = await new Promise((resolve, reject) => {
      // @see https://github.com/rtcdn/rtcdn-draft
      let data = {
        api: conf.apiUrl,
        tid: conf.tid,
        streamurl: conf.streamUrl,
        clientip: null,
        sdp: offer.sdp,
      };


      axios({
        method: 'POST',
        url: conf.apiUrl,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
      })
        .then((data) => {
          console.log('Got answer: ', data);
          if (data.code) {
            reject(data);
            return;
          }

          resolve(data.data);
        })
        .catch((e) => {
          reject(e);
        });
    });

    await self.pc.setRemoteDescription(
      new RTCSessionDescription({ type: 'answer', sdp: session.sdp }),
    );

    session.simulator =
      conf.schema +
      '//' +
      conf.urlObject.server +
      ':' +
      conf.port +
      '/rtc/v1/nack/';

    return session;
  };

  // Close the player.
  self.close = () => {
    console.log('close sdk')
    self.pc && self.pc.close();
    self.pc = null;
  };

  // The callback when got remote track.
  // Note that the onaddstream is deprecated, @see https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onaddstream
  self.ontrack = (event) => {
    // https://webrtc.org/getting-started/remote-streams
    self.stream.addTrack(event.track);
  };

  // Internal APIs.
  self.__internal = {
    defaultPath: '/rtc/v1/play/',
    prepareUrl: (webrtcUrl) => {
      let urlObject = self.__internal.parse(webrtcUrl);

      // If user specifies the schema, use it as API schema.
      let schema = urlObject.user_query.schema;
      schema = schema ? schema + ':' : window.location.protocol;

      let port = urlObject.port || 1985;
      if (schema === 'https:') {
        port = urlObject.port || 443;
      }

      // @see https://github.com/rtcdn/rtcdn-draft
      let api = urlObject.user_query.play || self.__internal.defaultPath;
      if (api.lastIndexOf('/') !== api.length - 1) {
        api += '/';
      }

      let apiUrl = schema + '//' + urlObject.server + ':' + port + api;
      for (let key in urlObject.user_query) {
        if (key !== 'api' && key !== 'play') {
          apiUrl += '&' + key + '=' + urlObject.user_query[key];
        }
      }
      // Replace /rtc/v1/play/&k=v to /rtc/v1/play/?k=v
      apiUrl = apiUrl.replace(api + '&', api + '?');

      let streamUrl = urlObject.url;

      return {
        apiUrl: apiUrl,
        streamUrl: streamUrl,
        schema: schema,
        urlObject: urlObject,
        port: port,
        tid: Number(parseInt(new Date().getTime() * Math.random() * 100))
          .toString(16)
          .substr(0, 7),
      };
    },
    parse: (url) => {
      // @see: http://stackoverflow.com/questions/10469575/how-to-use-location-object-to-parse-url-without-redirecting-the-page-in-javascri
      let a = document.createElement('a');
      a.href = url
        .replace('rtmp://', 'http://')
        .replace('webrtc://', 'http://')
        .replace('rtc://', 'http://');

      let vhost = a.hostname;
      let app = a.pathname.substr(1, a.pathname.lastIndexOf('/') - 1);
      let stream = a.pathname.substr(a.pathname.lastIndexOf('/') + 1);

      // parse the vhost in the params of app, that srs supports.
      app = app.replace('...vhost...', '?vhost=');
      if (app.indexOf('?') >= 0) {
        let params = app.substr(app.indexOf('?'));
        app = app.substr(0, app.indexOf('?'));

        if (params.indexOf('vhost=') > 0) {
          vhost = params.substr(params.indexOf('vhost=') + 'vhost='.length);
          if (vhost.indexOf('&') > 0) {
            vhost = vhost.substr(0, vhost.indexOf('&'));
          }
        }
      }

      // when vhost equals to server, and server is ip,
      // the vhost is __defaultVhost__
      if (a.hostname === vhost) {
        let re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        if (re.test(a.hostname)) {
          vhost = '__defaultVhost__';
        }
      }

      // parse the schema
      let schema = 'rtmp';
      if (url.indexOf('://') > 0) {
        schema = url.substr(0, url.indexOf('://'));
      }

      let port = a.port;
      if (!port) {
        if (schema === 'http') {
          port = 80;
        } else if (schema === 'https') {
          port = 443;
        } else if (schema === 'rtmp') {
          port = 1935;
        }
      }

      let ret = {
        url: url,
        schema: schema,
        server: a.hostname,
        port: port,
        vhost: vhost,
        app: app,
        stream: stream,
      };

      self.__internal.fill_query(a.search, ret);

      // For webrtc API, we use 443 if page is https, or schema specified it.
      if (!ret.port) {
        if (schema === 'webrtc' || schema === 'rtc') {
          if (ret.user_query.schema === 'https') {
            ret.port = 443;
          } else if (window.location.href.indexOf('https://') === 0) {
            ret.port = 443;
          } else {
            // For WebRTC, SRS use 1985 as default API port.
            ret.port = process.env.REACT_APP_AGENT_SRS_PORT || 1985;
          }
        }
      }

      return ret;
    },

    fill_query: (query_string, obj) => {
      // pure user query object.
      obj.user_query = {};

      if (query_string.length === 0) {
        return;
      }

      // split again for angularjs.
      if (query_string.indexOf('?') >= 0) {
        query_string = query_string.split('?')[1];
      }

      let queries = query_string.split('&');
      for (let i = 0; i < queries.length; i++) {
        let elem = queries[i];

        let query = elem.split('=');
        obj[query[0]] = query[1];
        obj.user_query[query[0]] = query[1];
      }

      if (obj.domain) {
        obj.vhost = obj.domain;
      }
    },
  };

  self.pc = new RTCPeerConnection(null);

  self.stream = new MediaStream();

  self.pc.ontrack = function (event) {
    if (self.ontrack) {
      self.ontrack(event);
    }
  };

  return self;
};
