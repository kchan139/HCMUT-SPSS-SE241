import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationList,
  PaginationPage,
  PaginationGap,
} from "primitives";
import BackgroundSVG from "../../assets/background.svg";
import "./hist_Admin.css";
import { IconSearch } from "icons";
import { Button } from "primitives";
import { IconChevronDown, IconCopy, IconTrash2, IconEdit2 } from "icons";

//Backend update data with format like records. The number of records per page can be edited by the variable recordsPerPage in line 30

const records = [
  { MSSV: "2252938", printer: "Printer A", date: "2024-11-20", status: "Completed" },
  { MSSV: "2252939", printer: "Printer B", date: "2024-11-19", status: "Pending" },
  { MSSV: "2252940", printer: "Printer C", date: "2024-11-18", status: "Completed" },
  { MSSV: "2252941", printer: "Printer D", date: "2024-11-17", status: "Pending" },
  // Add more records as needed
];

function Admin_history() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const generatePagination = () => {
    const paginationItems = [];
    const visibleRange = 2; // Number of pages around the current page

    // Always include the first page
    paginationItems.push(
      <PaginationPage
        key={1}
        href="#"
        current={currentPage === 1}
        onPress={() => handlePageChange(1)}
      >
        1
      </PaginationPage>
    );

    // Add gap if the range from the first page is too large
    if (currentPage - visibleRange > 2) {
      paginationItems.push(<PaginationGap key="gap-start" />);
    }

    // Add pages around the current page
    for (
      let page = Math.max(2, currentPage - visibleRange);
      page <= Math.min(totalPages - 1, currentPage + visibleRange);
      page++
    ) {
      paginationItems.push(
        <PaginationPage
          key={page}
          href="#"
          current={currentPage === page}
          onPress={() => handlePageChange(page)}
        >
          {page}
        </PaginationPage>
      );
    }

    // Add gap if the range to the last page is too large
    if (currentPage + visibleRange < totalPages - 1) {
      paginationItems.push(<PaginationGap key="gap-end" />);
    }

    // Always include the last page
    paginationItems.push(
      <PaginationPage
        key={totalPages}
        href="#"
        current={currentPage === totalPages}
        onPress={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </PaginationPage>
    );

    return paginationItems;
  };

  return (
    <div>
      <Navbar property="Admin" />
      <div
        style={{
          backgroundImage: `url(${BackgroundSVG})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="input-wrapper">
            <input className="searchBar" placeholder="Search..." />
            <IconSearch className="icon-search icon-black" />
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>
                  <Button
                    onPress={() => alert("MSSV clicked")}
                    variant="neutral"
                    className="buttonTable"
                  >
                    MSSV
                    <IconChevronDown />
                  </Button>
                </th>
                <th>
                  <Button
                    onPress={() => alert("Máy in clicked")}
                    variant="neutral"
                    className="buttonTable"
                  >
                    Máy in
                    <IconChevronDown />
                  </Button>
                </th>
                <th>
                  <Button
                    onPress={() => alert("Ngày in clicked")}
                    variant="neutral"
                    className="buttonTable"
                  >
                    Ngày in
                    <IconChevronDown />
                  </Button>
                </th>
                <th>
                  <Button
                    onPress={() => alert("Trạng thái clicked")}
                    variant="neutral"
                    className="buttonTable"
                  >
                    Trạng thái
                    <IconChevronDown />
                  </Button>
                </th>
                <th>
                  <Button
                    onPress={() => alert("Hành động clicked")}
                    variant="neutral"
                    className="buttonTable"
                  >
                    Hành động
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.MSSV}</td>
                  <td>{record.printer}</td>
                  <td>{record.date}</td>
                  <td>{record.status}</td>
                  <td>
                    <Button
                      variant="neutral"
                      className="buttonTable"
                      onPress={() => alert("Copy clicked")}
                    >
                      <IconCopy className="icon-black" />
                    </Button>
                    <Button
                      variant="neutral"
                      className="buttonTable"
                      onPress={() => alert("Edit clicked")}
                    >
                      <IconEdit2 className="icon-black" />
                    </Button>
                    <Button
                      variant="neutral"
                      className="buttonTable"
                      onPress={() => alert("Delete clicked")}
                    >
                      <IconTrash2 className="icon-black" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination style={{ justifyContent: "center" }}>
            <PaginationList>
              <PaginationPrevious
                href="#"
                onPress={() => handlePageChange(Math.max(1, currentPage - 1))}
              >
                Previous
              </PaginationPrevious>
              {generatePagination()}
              <PaginationNext
                href="#"
                onPress={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              >
                Next
              </PaginationNext>
            </PaginationList>
          </Pagination>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin_history;