import React from 'react';
export default class ReservationCard extends React.Component {
    render() {
        return (
            <div className="my-1 py-4" style={{ backgroundColor: '#EEE' }}>
                <div className="row m-0 px-5 justify-content-between align-items-center">
                    <div>
                        <h5 className="row">
                            {"Hall No. "+this.props.hall}
                    </h5>
                        <div className="row text-secondary">
                            {this.props.date}
                    </div>
                    </div>
                    <div className="text-secondary">
                        {this.props.time}
                </div>
                    <div className="btn btn-success shadow" onClick = {()=>this.props.onClick()}>
                        Reserve
                </div>
                </div>
            </div>
        );
    }
}