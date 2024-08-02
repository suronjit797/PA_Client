/* eslint-disable react/prop-types */
import React from "react";
import { Empty, Pagination } from "antd";

const DataTable = ({ dataSource, columns, pagination, onChange }) => {
  if (dataSource.length && columns.length) {
    return (
      <div>
        <div className="my-4" style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                {columns?.map((col) => {
                  return (
                    <th
                      className={`px-2 text-md-${col.align}`}
                      style={{
                        minWidth: col?.width ? col.width : "",
                        maxWidth: col?.width ? col.width : "",
                      }}
                      key={col.title}
                    >
                      <span>{col.title}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {dataSource?.map((row, index) => (
                <tr key={index}>
                  {columns.map((col, colIndex) => (
                    <td
                      style={{
                        textAlign: col?.align ? col.align : "inherit",
                        "--width": col?.width ? col.width : "",
                      }}
                      key={colIndex}
                      className="px-2 py-3"
                    >
                      <div className="tableData">
                        {typeof col?.render === "function"
                          ? col?.render(col?.dataIndex ? row[col.dataIndex] : row, row, index)
                          : row[col.dataIndex]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {dataSource.length <= 0 ? (
          <Empty className="w-100" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <div className="d-flex">
            <div className="ms-auto">
              <Pagination
                // hideOnSinglePage={true}
                {...pagination}
                onChange={(page, pageSize) => onChange({ current: page, pageSize })}
              />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <Empty className="w-100" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
};

export default React.memo(DataTable);
