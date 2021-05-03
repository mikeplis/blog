import { Container } from "../components/Container";
import { MoreStories } from "../components/MoreStories";
import { HeroPost } from "../components/HeroPost";
import { Intro } from "../components/Intro";
import { Layout } from "../components/Layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { Post } from "../types/post";

type Props = {
    allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
    const heroPost = allPosts[0];
    const morePosts = allPosts.slice(1);
    return (
        <>
            <Layout>
                <Head>
                    <title>Blog</title>
                </Head>
                <Container>
                    <Intro />
                    {heroPost && (
                        <HeroPost
                            title={heroPost.title}
                            date={heroPost.date}
                            slug={heroPost.slug}
                            excerpt={heroPost.excerpt}
                        />
                    )}
                    {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                </Container>
            </Layout>
        </>
    );
};

export default Index;

export const getStaticProps = async () => {
    const allPosts = getAllPosts(["title", "date", "slug", "excerpt"]);

    return {
        props: { allPosts },
    };
};
