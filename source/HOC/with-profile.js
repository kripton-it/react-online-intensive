// Core
import React, { createContext, Component } from 'react';

const { Provider, Consumer } = createContext();

const withProfile = (Enhanceable) => {
    return class WithProfile extends Component {
        render() {
            return (
                <Consumer>
                    {(context) => {
                        return (
                            <Enhanceable
                                { ...context }
                                { ...this.props }
                            />
                        );
                    }}
                </Consumer>
            );
        }
    };
};

export { Provider, Consumer, withProfile };
