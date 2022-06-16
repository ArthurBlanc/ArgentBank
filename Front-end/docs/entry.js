
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/components/AccountCard/index.jsx';
reactComponents['AccountCard'] = Component0;

import Component1 from '../src/components/Footer/index.jsx';
reactComponents['Footer'] = Component1;

import Component2 from '../src/components/Header/index.jsx';
reactComponents['Header'] = Component2;

import Component3 from '../src/pages/Home/index.jsx';
reactComponents['Home'] = Component3;

import Component4 from '../src/components/HomeFeature/index.jsx';
reactComponents['HomeFeature'] = Component4;

import Component5 from '../src/pages/Login/index.jsx';
reactComponents['Login'] = Component5;

import Component6 from '../src/pages/Profile/index.jsx';
reactComponents['Profile'] = Component6;

import Component7 from '../src/Router.jsx';
reactComponents['Router'] = Component7;