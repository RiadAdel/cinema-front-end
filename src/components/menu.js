import React from 'react';
import colors from './../assets/color';
export default class Menu extends React.Component {
    render() {
        return (
            <div className="col-2 p-0 m-0" style={{ backgroundColor: colors.background }}>
                {
                    this.props.tasks ? this.props.tasks.map((task, i) => {
                        let active = i === this.props.active ? "active" : "";
                        return (
                            <div key={i}>
                                {
                                    active === "active" ? (<div
                                        style={{
                                            backgroundColor: colors.primary,
                                            width: '100%',
                                            height: 4
                                        }}
                                    ></div>) : null
                                }
                                <div onClick={() => this.props.onClick(i)}
                                    className={'d-block btn btn-dark rounded-0 py-2 ' + active}
                                >
                                    {task.name}
                                </div>
                                {
                                    active === "active" ? (<div
                                        style={{
                                            backgroundColor: colors.primary,
                                            width: '100%',
                                            height: 4
                                        }}
                                    ></div>) : null
                                }
                            </div>

                        );
                    }
                    ) : null
                }
            </div>);
    }
}
