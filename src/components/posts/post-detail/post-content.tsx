import React from "react";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'


SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)


function PostContent(props:any) {
  const { post } = props
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    code(code:any) {
      const { className, children } = code;

      return (
        <SyntaxHighlighter style={atomDark} language={className}>
          {children}
        </SyntaxHighlighter>
      );
    },
    p(paragraph:any) {
      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
  };
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
