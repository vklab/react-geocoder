
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';

import Geocoder from '..';

import ACCESS_TOKEN from '../ACCESS_TOKEN';

storiesOf('Geocoder', module)
  .add('renders', () => (
    <Geocoder
      accessToken={ACCESS_TOKEN}
      onSelect={action('onSelect')}
      onSuggest={action('onSuggest')}
    />
  ))
  .add('inputPosition bottom', () => (
    <Geocoder
      accessToken={ACCESS_TOKEN}
      onSelect={action('onSelect')}
      inputPosition="bottom"
    />
  ))
  .add('inputPlaceholder', () => (
    <Geocoder
      accessToken={ACCESS_TOKEN}
      onSelect={action('onSelect')}
      inputPlaceholder="find your new home"
    />
  ))
  .add('focusOnMount', () => (
    <Geocoder
      accessToken={ACCESS_TOKEN}
      onSelect={action('onSelect')}
      focusOnMount
    />
  ))
  .add('showLoader', () => (
    <Geocoder
      accessToken={ACCESS_TOKEN}
      onSelect={action('onSelect')}
      showLoader
    />
  ));
