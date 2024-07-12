import { FooterWrapper } from "../styles/FooterStyled";

function Footer() {
  return (
    <FooterWrapper>
      <div className="row">
        <div  className="col">Questions? Contact us.</div>
      </div>
      <div className="row">
        <div  className="col">FAQ</div>
        <div  className="col">Help Center</div>
        <div  className="col">Account</div>
        <div  className="col">Media Center</div>
      </div>
      <div className="row">
        <span>
          Netflix Services Korea Ltd. E-Commerce Registration Number: Je
          2018-Seoul Jong-ro-0426 Ho. Phone: Representative: Reginald Shawn
          Thompson Email: korea@netflix.com Address: 20F, Tower A, Centropolis
          Building 26, Ujeongguk-ro, Jongno-gu, Seoul, 03161 Republic of Korea
          Business registration number: 165-87-00119 Hosted by: Amazon Web
          Services Inc. KFTC website
        </span>
      </div>
    </FooterWrapper>
  );
}

export default Footer;
