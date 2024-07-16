import React from "react";
import { Table, Image } from "react-bootstrap";

const TeacherList = ({ teachers }) => {
  return (
    <>
      <Table
        bordered
        hover
        style={{
          fontSize: 14,
          borderCollapse: "collapse",
          borderRadius: "8px",
          overflow: "hidden",
          borderColor: "#E5E7EB",
          marginLeft: "12px"
        }}
      >
        <thead>
            <tr
              className="text-uppercase text-secondary"
              style={{ backgroundColor: "#F9FAFB" }}
            >
            <th>NAME</th>
            <th>PHONE</th>
            <th>EMAIL</th>
            <th>CERTIFICATE</th>
            <th>EXPERIENCE</th>
            <th>CLASS</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="d-flex">
                <Image
                  src={teacher.avatar}
                  roundedCircle="true"
                  width="40px"
                  height="40px"
                ></Image>
                <div style={{ marginLeft: "8px" }}>
                  <div style={{ fontWeight: "600" }}>{teacher.name}</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>{teacher.msgv}</div>
                </div>
              </td>
              <td>{teacher.phone}</td>
              <td>{teacher.email}</td>
              <td>{teacher.certificate}</td>
              <td>{teacher.experience}</td>
              <td>{teacher.class.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TeacherList;
