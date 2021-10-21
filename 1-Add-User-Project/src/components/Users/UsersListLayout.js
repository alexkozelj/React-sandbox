import React from "react";
import classes from "./UsersListLayout.module.css"
import Card from "../UI/Card";

const UsersListLayout = (props) => {
   return (
      <Card className={classes.users}>
         <ul>
            {props.users.map((user) => {
               return (
                  <li key={user.id}>
                     {user.username} ({user.age} years old)
                  </li>
               );
            })}
         </ul>
      </Card>
   );
};

export default UsersListLayout;
