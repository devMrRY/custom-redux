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

        const mapDispatchTopProps = () => {
          let { dispatch } = store;
          if(typeof mapActionToProps === "function"){
            return mapActionToProps(dispatch, props)
          }else if(typeof mapActionToProps === "object"){
            let obj = {};
            Object.entries(mapActionToProps).forEach(([key, func]) => {
              obj[key] = (payload) => dispatch(func(payload))
            })
            return obj
          }else {
            return ({})
          }
        }
      return (
        <WrappedComponent
          {...props}
          {...(mapStateToProps ? mapStateToProps(store.getState(), props) : {})}
          {...(mapDispatchTopProps())}
        />
      );
    };
  };
