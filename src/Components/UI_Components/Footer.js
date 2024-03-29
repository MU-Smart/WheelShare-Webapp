const Footer = () => {
  return (
    <>
      <footer className="footer p-4 bg-accent font-mono text-white">
        <div>
          <span className="font-bold text-xl">About Us</span>
          <a>
            MyPath is a project aiming to provide a accesibility assistance for mobility-impared
            people. <br />
            By ultilizing the data from Google Maps and OSM, we create a special algorithm to find<br />
            the best route that is suitable for wheelchair users.<br />
            For more information, please visit us&nbsp;
            <a
              className="link link-hover link-success"
              href="http://routemypath.com"
            >
              here
            </a>
            .
          </a>
        </div>

        <div>
          <span className="font-bold text-xl">Our Team</span>
          <a>Vaskar Raychoudhury, Nam Hoang,</a>
          <a>Thomas Nguyen, Nico Kazynski,</a>
          <a>Patrick Duimstra, Kian Metcalfe</a>

        </div>

        <div>
          <span className="font-bold text-xl">Feedback</span>
          <a>
            The project is still under active development and maintainance <br />
            If you encounter any bugs or want to request any features, please contact us&nbsp;
            <a
              className="link link-hover link-success"
              href="mailto:raychov@miamioh.edu"
            >
              here
            </a>
            . <br/>Thank you for your support.
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
