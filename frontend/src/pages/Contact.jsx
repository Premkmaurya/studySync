import React from "react";
import Nav from "../components/home/hero/Nav";
import Orb from "../components/react-bits-components/Orb";
import ContactHero from "../components/contact/ContactHero";
import ContactDetails from "../components/contact/ContactDetails";
import ContactForm from "../components/contact/ContactForm";
import Footer from "../components/home/footer/Footer";

const Contact = () => {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <div className="w-full h-[90vh] absolute top-0 left-0">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      <ContactHero />
        <ContactDetails />
        <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
