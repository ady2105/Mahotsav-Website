# Mahotsav-Website
this repo is for the creation of website of the upcoming major event of photography and fine arts sub-council's event Mahotsav. Here you'll be able access the raw code and can  help in building the website together. :)
graph TD
    A[index.html (Landing Page)] --> B(Header/Navbar);
    A --> K[Register Button/Container];
    A --> L(Short Event Glimpses);
    A --> M(Sponsor Details Preview);

    B --> C(Home);
    B --> D(About Me Page);
    B --> E(General Register Page);
    B --> F(Event Folder/Page);
    B --> N(Event Sponsors Page);

    subgraph User Journey/Navigation
        F --> G(Event 1 Page);
        F --> H(Event 2 Page);
    end

    L -->|See Full Details| G;
    L -->|See Full Details| H;

    G --> I(Register: Event 1);
    H --> J(Register: Event 2);

