import React from "react";
import NextHead from "next/head";

interface HeadProps {
  title: string;
}

export const Head = ({ title }: HeadProps) => {
    return (
        <NextHead>
            <title>{title}</title>
        </NextHead>
    );
};