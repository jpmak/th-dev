import React from 'react';
var Record = React.createClass({
    getInitialState: function() {
        return {
            banana: '0'
        };
    },
    componentWillMount: function() {



        // let banana = '';
        // fetch("http://dev.thgo8.com/?g=WapSite&c=Exchange&a=user_info", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     }

        // }).then(function(res) {
        //     if (res.ok) {
        //         res.json().then(function(data) {
        //             console.log(data.info.banana);
        //             // $("#record-num").html(data.info.banana)
        //         });
        //     }

        // }).catch(function(e) {
        //     console.log("加载失败");
        // });

        $.getJSON("/json/user_info.json", function(data) {
            if (this.isMounted()) {
                this.setState({
                    banana: data.info.banana

                });
            }

        }.bind(this));
    },
    render: function() {
        return (
            <div className="jf-record">
                <div className="box">
                    <div className="jf-left">
                        <i className="th-banana-iconbtn"></i>
                        <div id="record-num" className="num">{this.state.banana}</div>
                    </div>
                    <div className="jf-right"><a className="record" href={this.props.handhref}>兑换记录</a></div>
                </div>
            </div>

        )
    }
})



export default Record;