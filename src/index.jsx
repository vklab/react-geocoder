import 'babel-polyfill';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import search from './search';

import {
  Input,
  InputWrapper,
  SearchIcon,
  ResultList,
  Result,
  ResultLink,
  Wrapper,
} from './styles';

export default class Geocoder extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      focus: null,
      loading: false,
      searchTime: new Date(),
      value: '',
    };

    this.onInput = this.onInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.clickOption = this.clickOption.bind(this);
    this.onResult = this.onResult.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    const { focusOnMount } = this.props;
    if (focusOnMount) this.input.focus();
  }

  onChange({ target }) {
    this.setState({
      value: target.value,
    });
  }

  onInput(e) {
    this.setState({ loading: true });
    const { value } = e.target;
    if (value === '') {
      this.setState({
        results: [],
        focus: null,
        loading: false,
      });
    } else {
      const {
        endpoint,
        source,
        accessToken,
        proximity,
        bbox,
        types,
      } = this.props;

      search({
        endpoint,
        source,
        accessToken,
        proximity,
        bbox,
        types,
        query: value,
        onResult: this.onResult,
      });
    }
  }

  onKeyDown(e) {
    const { results, focus } = this.state;
    switch (e.which) {
      // up
      case 38:
        e.preventDefault();
        this.moveFocus(-1);
        break;
      // down
      case 40:
        this.moveFocus(1);
        break;
      // accept
      case 13:
        if (results.length > 0 && focus == null) {
          this.clickOption(results[0], 0);
        }
        this.acceptFocus();
        break;
      default:
        break;
    }
  }

  onResult(body, searchTime) {
    const { searchTime: oldSearchTime, results } = this.state;
    const { onSuggest } = this.props;

    // searchTime is compared with the last search to set the state
    // to ensure that a slow xhr response does not scramble the
    // sequence of autocomplete display.
    if (body && body.features && oldSearchTime <= searchTime) {
      this.setState({
        searchTime,
        loading: false,
        results: body.features,
        focus: null,
      });
      onSuggest(results);
    }
  }

  onSelect(place) {
    const { onSelect } = this.props;

    this.setState({
      value: '',
      results: [],
    });

    onSelect(place);
  }

  setInput(text) {
    this.setState({
      value: text,
    });
  }

  moveFocus(dir) {
    const { loading, focus, results } = this.state;
    if (loading) return;
    this.setState({
      focus: focus === null
        ? 0 : Math.max(0,
          Math.min(
            results.length - 1,
            focus + dir,
          )),
    });
  }

  acceptFocus() {
    const { focus, results } = this.state;
    const { onSelect } = this.props;

    if (focus !== null) {
      this.onSelect(results[focus]);
    }
  }

  clickOption(place, listLocation) {
    const { onSelect } = this.props;

    this.onSelect(place);
    this.setState({ focus: listLocation });

    // focus on the input after click to maintain key traversal
    this.input.focus();
    return false;
  }

  render() {
    const {
      inputClass,
      inputPlaceholder,
      inputPosition,
      showLoader,
      resultsClass,
      resultClass,
      resultFocusClass,
      ResultList: CustomResultList,
      Result: CustomResult,
      ResultLink: CustomResultLink,
      InputWrapper: CustomInputWrapper,
      SeachIcon: CustomSearchIcon,
      Input: CustomInput,
      Wraapper: CustomWrapper,
    } = this.props;

    const {
      results,
      loading,
      focus,
      value,
    } = this.state;

    const Components = {
      ResultList: CustomResultList || ResultList,
      Result: CustomResult || Result,
      ResultLink: CustomResultLink || ResultLink,
      InputWrapper: CustomInputWrapper || InputWrapper,
      SearchIcon: CustomSearchIcon || SearchIcon,
      Input: CustomInput || Input,
      Wrapper: CustomWrapper || Wrapper,
    };

    const input = (
      <Components.InputWrapper>
        <Components.SearchIcon />
        <Components.Input
          innerRef={(ref) => { this.input = ref; }}
          className={inputClass}
          onInput={this.onInput}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          placeholder={inputPlaceholder}
          type="text"
          value={value}
        />
      </Components.InputWrapper>
    );

    return (
      <Components.Wrapper>
        {inputPosition === 'top' && input}
        <Components.ResultList className={`
              ${showLoader && loading
          ? 'loading'
          : ''
              }
              ${resultsClass}`}
        >
          {results.length > 0 && (
            results.map((result, i) => (
              <Components.Result key={result.id}>
                <Components.ResultLink
                  type="button"
                  onClick={() => this.clickOption(result, i)}
                  className={`${resultClass} ${i === focus ? resultFocusClass : ''}`}
                  key={result.id}
                >
                  {result.place_name}
                </Components.ResultLink>
              </Components.Result>
            ))
          )}
        </Components.ResultList>
        {inputPosition === 'bottom' && input}
      </Components.Wrapper>
    );
  }
}

Geocoder.propTypes = {
  endpoint: PropTypes.string,
  source: PropTypes.string,
  accessToken: PropTypes.string.isRequired,

  inputClass: PropTypes.string,
  resultClass: PropTypes.string,
  resultsClass: PropTypes.string,
  resultFocusClass: PropTypes.string,

  ResultList: PropTypes.element,
  Result: PropTypes.element,
  ResultLink: PropTypes.element,
  InputWrapper: PropTypes.element,
  SeachIcon: PropTypes.element,
  Input: PropTypes.element,
  Wraapper: PropTypes.element,

  showLoader: PropTypes.bool,
  focusOnMount: PropTypes.bool,

  inputPosition: PropTypes.string,
  inputPlaceholder: PropTypes.string,

  onSelect: PropTypes.func.isRequired,
  onSuggest: PropTypes.func,

  proximity: PropTypes.string,
  bbox: PropTypes.string,

  types: PropTypes.string,
};

Geocoder.defaultProps = {
  endpoint: 'https://api.tiles.mapbox.com',

  inputClass: '',
  resultClass: '',
  resultsClass: '',
  resultFocusClass: 'strong',

  ResultList: null,
  Result: null,
  ResultLink: null,
  InputWrapper: null,
  SeachIcon: null,
  Input: null,
  Wraapper: null,

  inputPosition: 'top',

  inputPlaceholder: 'Search',

  showLoader: false,

  source: 'mapbox.places',
  proximity: '',

  bbox: '',
  types: '',

  onSuggest: () => null,
  focusOnMount: true,
};
