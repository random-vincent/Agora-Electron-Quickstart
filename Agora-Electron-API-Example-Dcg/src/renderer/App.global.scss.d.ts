declare namespace AppGlobalScssNamespace {
  export interface IAppGlobalScss {
    app: string;
    root: string;
  }
}

declare const AppGlobalScssModule: AppGlobalScssNamespace.IAppGlobalScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppGlobalScssNamespace.IAppGlobalScss;
};

export = AppGlobalScssModule;
