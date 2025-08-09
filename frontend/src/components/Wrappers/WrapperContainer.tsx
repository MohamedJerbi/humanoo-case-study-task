import React, { type FC } from "react";

const WrapperContainer: FC<React.PropsWithChildren<object>> = ({
  children,
}) => <div className="container mx-auto px-4 py-8">{children}</div>;

export default WrapperContainer;
