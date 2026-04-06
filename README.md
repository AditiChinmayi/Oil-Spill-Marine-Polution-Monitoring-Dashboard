# Oil-Spill-Marine-Polution-Monitoring-Dashboard
Oil Spills and Marine Pollution Dashboard is a geospatial decision-support platform designed to monitor, visualize, and analyze coastal pollution incidents through an interactive, map-centric interface.

The system focuses on real-world marine environmental challenges by integrating multiple pollution categories such as oil spills, plastic waste accumulation, chemical contamination, and algal blooms. Each incident is represented as a geolocated marker with detailed attributes including severity classification, affected area (in km²), timestamp, and descriptive context, enabling users to perform both spatial and temporal analysis.

At its core, the dashboard follows a “map-as-primary-interface” design philosophy, where all interactions originate from the geospatial layer. Users can explore incidents directly on the map, access contextual popups, and dynamically filter data to focus on specific pollution types or severity levels. This approach enhances situational awareness and mirrors real-world environmental monitoring systems.

A key highlight of the platform is its stakeholder-oriented perspective system. Instead of presenting raw data uniformly, the dashboard adapts its analytics and insights based on different user roles:

* Fishermen View: Identifies restricted fishing zones, potential fish kill events, and risk-prone areas affecting livelihood.
* Government View: Tracks incident response status (active, contained, resolved), estimates cleanup efforts, and highlights critical zones requiring intervention.
* Tourism View: Evaluates beach safety based on proximity to pollution events, categorizing locations into safe, caution, and danger zones.
* Residents View: Provides a health risk index by region, reflecting potential environmental and public health impacts.

The system includes a dynamic analytics layer powered by integrated charting and statistical summaries. Users can observe distribution patterns of pollution types, monthly incident trends, and severity breakdowns. These insights are continuously synchronized with user interactions such as filtering and view switching.

To support operational usability, the dashboard implements:

* A real-time-style alert system for high-severity incidents
* Live statistical counters with animated updates
* A searchable and interactive incident log with direct map navigation
* A sliding data drawer for structured tabular exploration
* Context-aware UI panels that adjust content based on selected stakeholder view
* Toggleable map layers (standard and satellite) for enhanced spatial understanding

The application is built using Leaflet.js for geospatial rendering and Chart.js for analytical visualization, with a custom-designed HUD (Heads-Up Display) interface that prioritizes clarity, responsiveness, and immersive interaction.

This project serves as a prototype for a scalable environmental monitoring and decision-support system, with potential extensions including real-time data integration, backend connectivity, predictive analytics, and machine learning-based anomaly detection.

