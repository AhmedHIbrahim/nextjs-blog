import PostContent from "@/components/posts/post-detail/post-content";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

function PostDetailPage(props:any) {
  const slug = useRouter().query.slug;

  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

import { getPostData, getPostsFiles } from "../../lib/posts-util";
import Head from "next/head";
export function getStaticProps(context: any) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  console.log("data:: ", postData);
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
