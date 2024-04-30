import React from "react";
import { Link } from "react-router-dom";
import OfferServiceForm from "./OfferServiceForm";
import { useAuth } from "./AuthContext";

// dummy data for project items
const projects = [
  {
    id: 1,
    title: "Interior Cleaning Service",
    imageUrl: "assets/img/home-one/project1.jpg",
    detailUrl: "/project-details/1",
  },
  {
    id: 2,
    title: "Home Cleaning",
    imageUrl: "assets/img/home-one/project2.jpg",
    detailUrl: "/project-details/2",
  },
  {
    id: 3,
    title: "Office Cleaning Service",
    imageUrl: "assets/img/home-one/project3.jpg",
    detailUrl: "/project-details/3",
  },
  {
    id: 4,
    title: "Home Cleaning Service",
    imageUrl: "assets/img/home-one/project5.jpg",
    detailUrl: "/project-details/5",
  },
];

// ProjectItem component
const ProjectItem = ({ id, title, imageUrl, detailUrl }) => (
  <div className="col-sm-6 col-lg-6">
    <div className="project-item">
      <div className="project-top">
        <Link to={detailUrl}>
          <img src={imageUrl} alt={title} />
        </Link>
      </div>
      <h3>
        <Link to={detailUrl}>{title}</Link>
      </h3>
      <Link to={detailUrl}>View Project</Link>
    </div>
  </div>
);

// ProjectsSection component
const ProjectsSection = () => {
  const { professionalId } = useAuth();

  return (
    <section className="project-area ptb-100">
      <div className="container">
        <div className="row">
          {projects.map((project) => (
            <ProjectItem key={project.id} {...project} />
          ))}
          {professionalId && (
            <OfferServiceForm profesional_id={professionalId} />
          )}
        </div>
        <div className="pagination-area">
          {/* Pagination */}
          <ul>
            <li>
              <Link to="#">Prev</Link>
            </li>
            <li>
              <Link to="#">1</Link>
            </li>
            <li>
              <Link to="#">2</Link>
            </li>
            <li>
              <Link to="#">3</Link>
            </li>
            <li>
              <Link to="#">Next</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
