import FeaturedCategory from "@/components/FeaturedCategory";
import AppLayout from "@/components/layouts/AppLayout";
import PromoSection from "@/components/PromoSection";
import ProductList2 from "@/components/ProductList2";
import storeFront from "@/lib/storeFront";
import { GetServerSideProps, GetStaticProps } from "next/types";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";

import Head from "next/head";
import { useEffect } from "react";
import useCart from "@/hooks/useCart";

const HomePage = ({ products, collections, user }) => {
  const { increment, count } = useCart();
  return (
    <>
      <Head>
        <title>Next Shopify</title>
      </Head>
      <AppLayout>
        <pre>{count}</pre>
        <button onClick={increment}>+</button>
        <PromoSection />
        <ProductList2 products={products} />
        <FeaturedCategory collections={collections} />
      </AppLayout>
    </>
  );
};

export default HomePage;

const gql = String.raw;
const query = gql`
  {
    products(first: 8) {
      edges {
        node {
          title
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            altText
            url
          }
        }
      }
    }
    collections(first: 6) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            altText
            url
          }
        }
      }
    }
  }
`;

export const getStaticProps: GetServerSideProps = async ({ req, res }) => {
  const {
    data: { products, collections },
  } = await storeFront(query);
  return {
    props: {
      products: products.edges.map((edge) => edge.node),
      collections: collections.edges.map((edge) => edge.node),
    },
    revalidate: 10,
  };
};
