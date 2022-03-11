import React, { useEffect, useState } from "react";
import store from "../redux/store";

export const connect = (mapStateToProps, mapActionToProps) => (WrappedComponent) => {
    return (props) => {
        const [state, setState] = useState({});
        useEffect(() => {
            store.subscribe(handleRender);
        }, [])

        const handleRender = () => {
            setState(store.getState());
        }
      return (
        <WrappedComponent
          {...props}
          {...(mapStateToProps ? mapStateToProps(store.getState(), props) : {})}
          {...(mapActionToProps ? mapActionToProps(store.dispatch, props) : {})}
        />
      );
    };
  };
