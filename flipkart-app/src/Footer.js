import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <p className="footer-headings">ABOUT</p>
                        <a href="/">Contact Us</a>
                        <a href="/">About Us</a>
                        <a href="/">Careers</a>
                        <a href="/">Flipkart Stories</a>
                        <a href="/">Press</a>
                        <a href="/">Flipkart Wholesale</a>
                        <a href="/">Cooperate Information</a>
                    </div>
                    <div className="col">
                        <p className="footer-headings">HELP</p>
                        <a href="/">Payment</a>
                        <a href="/">Shipping</a>
                        <a href="/">Cancellation &amp; Returns</a>
                        <a href="/">FAQ</a>
                        <a href="/">Report Infringement</a>
                    </div>
                    <div className="col">
                        <p className="footer-headings">POLICY</p>
                        <a href="/">Return Policy</a>
                        <a href="/">Terms Of Use</a>
                        <a href="/">Security</a>
                        <a href="/">Privacy</a>
                        <a href="/">Sitemap</a>
                        <a href="/">EPR Compliance</a>
                    </div>
                    <div className="col">
                        <p className="footer-headings">SOCIAL</p>
                        <a href="/">Facebook</a>
                        <a href="/">Twitter</a>
                        <a href="/">Youtube</a>
                    </div>
                    <div className="col normal-line-height">
                        <p className="footer-headings">Mail Us:</p>
                        <p>Flipkart Internet Private Limited,</p>
                        <p>Buildings Alyssa, Begonia &amp;</p>
                        <p>Clove Embassy Tech Village,</p>
                        <p>Outer Ring Road, </p>
                        <p>Devarabeesanahalli Village,</p>
                        <p>Bengaluru, 560103,</p>
                        <p>Karnataka, India</p>
                    </div>
                    <div className="col normal-line-height">
                        <p className="footer-headings">Registered Office Address:</p>
                        <p>Flipkart Internet Private Limited,</p>
                        <p>Buldings Alyssa, Begonia &amp;</p>
                        <p>Clove Embassy Tech Village,</p>
                        <p>Outer Ring Road,</p>
                        <p>Devarabeesanahalli Village,</p>
                        <p>Bengaluru, 560103,</p>
                        <p>Karnataka, India</p>
                    </div>
                </div>
            </div>

            
            <div className="text-center copyright"><a href="https://github.com/suraj-singh12"
                target="_blank" rel="noreferrer">&copy; suraj-singh12 (Suraj Singh)</a></div>
        </footer>
    )
}

export default Footer;