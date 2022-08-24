import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortUsersDown,
  sortUsersUp,
  changeState,
} from "../../redux/slices/usersSlice";
import "./Table.scss";
import axios from "axios";
import { GET_USERS_URL } from "../../utils/apis/index";
import { useCallback } from "react";
import { useState } from "react";
import Loading from "../loading/Loading";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

const Table = () => {
  const { titles, tableUsers } = useSelector((state) => state.users);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    const fetchedUsers = await axios.get(GET_USERS_URL);
    setIsLoading(false);
    dispatch(changeState(fetchedUsers.data));
  }, [dispatch]);

  useEffect(() => {
    console.log("first render");
    getUsers();
  }, [getUsers]);

  return (
    <>
      {isLoading && <Loading />}
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
    </>
  );
};

export default Table;
