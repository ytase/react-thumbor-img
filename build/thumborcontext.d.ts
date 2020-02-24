import React from "react";
declare type PassRelativeImg = {
    name: "passThrough";
};
declare type ErrorOnRelateiveImg = {
    name: "error";
};
interface prependOriginToRelativeImg {
    name: "prependOrigin";
    origin: string;
}
export declare type RelativeImgPolicy = PassRelativeImg | ErrorOnRelateiveImg | prependOriginToRelativeImg;
interface ThumborSettings {
    server: string;
    relativeImgPolicy: RelativeImgPolicy;
}
declare const ThumborContext: React.Context<ThumborSettings>;
interface ThumborConfigurationProps extends Partial<ThumborSettings> {
    children?: React.ReactNode;
}
declare function ThumborConfiguration(props: ThumborConfigurationProps): JSX.Element;
export { ThumborContext, ThumborConfiguration };
