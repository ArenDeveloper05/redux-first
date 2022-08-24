import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTableData,
  sortUsersDown,
  sortUsersUp,
} from "../../redux/slices/usersSlice";
import "./Table.scss";
import Loading from "../loading/Loading";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

const Table = () => {
  const { titles, tableUsers, loading, err } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    tableUsers.length === 0 && dispatch(fetchTableData(2));
  }, [dispatch, tableUsers]);

  return (
    <>
      {loading && <Loading />}
      {err && <p>{err.message}</p>}
      {!err && !loading && (
        <table border={1}>
          <thead>
            <tr>
              {titles &&
                titles.map((title, idx) => {
                  return (
                    <th key={idx}>
                      <AiFillCaretUp
                        className="sort-up-icon"
                        title="up"
                        onClick={(e) => dispatch(sortUsersUp(title))}
                      />
                      {title}
                      <AiFillCaretDown
                        className="sort-down-icon"
                        title="down"
                        onClick={(e) => dispatch(sortUsersDown(title))}
                      />
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {tableUsers &&
              tableUsers.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.website}</td>
                    <td>{user.phone}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
