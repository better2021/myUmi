import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//import { coy } from 'react-syntax-highlighter/dist/styles/prism'; // coy风格的代码高亮
//import { docco } from 'react-syntax-highlighter/dist/styles/hljs'; // docco风格的代码高亮

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
  };

  render() {
    const { language, value } = this.props;
    return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
  }
}

export default CodeBlock;
