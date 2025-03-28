import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
    return (
        <div className='about-container'>
            <Header />
            <h2>About Us</h2>
            <p> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ipsum eu nisl consectetur 
                lacinia. Nam a tortor erat. Aenean posuere justo nisi, varius lobortis turpis blandit vel. Cras
                 quis lectus blandit, semper mi sed, malesuada ligula. Sed maximus faucibus quam a commodo. 
                 Proin eu odio quam. Nam suscipit urna et magna aliquam tincidunt.
                Pellentesque a mauris magna. Ut fringilla nulla sit amet euismod mattis. Vestibulum vel accumsan 
                lacus. Praesent quis odio ut purus varius pretium. Interdum et malesuada fames ac ante ipsum primis 
                in faucibus. Integer tortor quam, aliquet in leo ac, placerat dignissim mi. Sed mollis enim vel 
                nulla venenatis, sed mollis magna venenatis. Vivamus aliquet massa at mattis bibendum. Phasellus 
                viverra euismod metus, ut malesuada diam rutrum in. Praesent a quam velit. Suspendisse velit sapien,
                convallis pretium est non, varius ullamcorper leo. Mauris elementum ultrices ante, in ullamcorper 
                odio. Vivamus nec magna in tellus dapibus laoreet. Ut magna tortor, interdum ac quam quis, ultricies
                imperdiet arcu. Vivamus id vestibulum ligula, sit amet volutpat ex.
                Etiam leo arcu, placerat sed rhoncus vitae, auctor at nunc. Fusce non venenatis augue. 
                Nullam molestie ut libero vitae luctus. Nullam quis auctor purus. Proin ornare nulla eget magna
                venenatis sodales. Etiam faucibus, metus ut dignissim pretium, justo velit euismod diam, non 
                malesuada neque neque at ex. Proin sit amet enim in tellus bibendum luctus in dapibus purus.
             </p>
            <Footer />
        </div>
    );
}

export default About;
