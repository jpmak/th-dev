import React from 'react';
import Slider from 'react-slick';



class Banner extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            slides: this.props.imgsrc
        }

        // this.click = this.click.bind(this)
    }
    componentDidUpdate() {

    }

    render() {
        let settings = {
            autoplaySpeed: 3000,
            dots: true,
            arrows: false,
            pauseOnHover: false,
            nextArrow: true,
            prevArrow: true,
            lazyLoad: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        // var repos = this.props.data.bann_top.advList;
        let repos = this.props.imgsrc

        let repoList = (repos || []).map(function(repo, index) {

            return (

                <div className = "swiper-slide" key = { index } ><img alt='' src = {repo}/> </div>

            );


        });
        if (!repos) {
            repoList = <div></div>
        }
        // console.log(repos)

        // // console.log(repoList) 
        //  {
        //     this.props.imgsrc.map(function(repo, index) {

        //         return (

        //         <div className = "swiper-slide" key = { index } ><img className = ""  src = {repo}/> </div>

        //         )
        //     })
        // } ;
        return (
            <div id='slick-wrap'>
<Slider {...settings}>
          
{repoList}
     </Slider>
     
</div>

        )
    }
}
export default Banner;