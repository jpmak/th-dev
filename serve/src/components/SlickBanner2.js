import React from 'react';
import Slider from 'react-slick';
import '../styles/slick.css';
import Loading from './public/Loading';

class SlickBanner2 extends React.Component {
    render() {

        let settings = {
            dots: true,
            arrows: false,
            nextArrow: true,
            prevArrow: true,
            lazyLoad: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        let repos = this.props.bannerItems_2;
        let repoList = (repos || []).map(function(repo, index) {
            return (
                <div className = "swiper-slide" key = { index } ><a href={repo.adv_url}><img className = "" alt={repo.adv_title} src = {repo.adv_img}/></a> </div>

            );
        });
        if (!repos.length) {
            repoList = <div><Loading/></div>
        }
        if (repos.length === 0) {
            repoList = <div></div>
        }


        return (
            <div>
<Slider {...settings}>
{repoList}
     </Slider>
     
</div>

        )
    }
}
export default SlickBanner2;