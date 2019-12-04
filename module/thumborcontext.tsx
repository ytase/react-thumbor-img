import React, { createContext } from "react";

type PassRelativeImg = {
  name: "passThrough";
};

type ErrorOnRelateiveImg = {
  name: "error";
};

interface prependOriginToRelativeImg {
  name: "prependOrigin";
  origin: string;
}

export type RelativeImgPolicy =
  | PassRelativeImg
  | ErrorOnRelateiveImg
  | prependOriginToRelativeImg;

interface ThumborSettings {
  server: string;
  relativeImgPolicy: RelativeImgPolicy;
}

const defaultSettings: ThumborSettings = {
  server: "",
  relativeImgPolicy: { name: "error" }
};

const ThumborContext: React.Context<ThumborSettings> = createContext(
  defaultSettings
);

interface ThumborConfigurationProps extends Partial<ThumborSettings> {
  children?: React.ReactNode;
}

function ThumborConfiguration(props: ThumborConfigurationProps) {
  const { children, ...newSettings } = props;
  const settings = { ...defaultSettings, ...newSettings };
  return (
    <ThumborContext.Provider value={settings}>
      {children}
    </ThumborContext.Provider>
  );
}

export { ThumborContext, ThumborConfiguration };
