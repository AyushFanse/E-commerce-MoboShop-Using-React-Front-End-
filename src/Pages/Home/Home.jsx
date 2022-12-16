import React, { useEffect, useState, useRef } from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import CardItems from "../../Components/CardData/CardItems";
import { TabTitle } from "../../Components/Common/CommonFun";
import jwt from "jsonwebtoken";
import axios from "axios";
import "./home.css";

const ProductComponent = ({ DataBase }) => {
    const [saved, setSaved] = useState([]);
    const [searches, setSearch] = useState("");
    const [products, setProduct] = useState(null);
    const [changed, setChange] = useState("");
    const FatchRef = useRef();
    const localToken = localStorage.getItem("token");
    const decodedToken = jwt.decode(localToken);
    TabTitle("MOBO SHOP | Home");

    useEffect(() => {
        FatchRef.current();
    }, [changed]);

    const Fatch = async () => {
        let response = await axios.get(`${DataBase}/product/getproduct`, {
            headers: { token: localToken },
        });
        setProduct(
            response.data.sort((a, b) => {
                return cal(a.createdAt) > cal(b.createdAt) ? 1 : -1;
            })
        );

        if (decodedToken) {
            let responseUsers = await axios.get(
                `${DataBase}/users/getuser/${decodedToken.user._id}`,
                {
                    headers: { token: localToken },
                }
            );
            setSaved(responseUsers.data.savedProduct);
        }
        setChange("");
    };

    FatchRef.current = Fatch;

    const cal = (date) => {
        let DateNow = new Date(Date.now());
        return DateNow - date;
    };

    return (
        <Grid>
            <Navbar saved={saved} page={"Moboshop"} search={setSearch} />
            <Grid container id="HomeCont">
                {products
                    ? products
                          .filter((search) => {
                              if (searches === "") {
                                  return search;
                              } else if (
                                  search.productName
                                      .toLowerCase()
                                      .includes(searches) ||
                                  search.processor
                                      .toLowerCase()
                                      .includes(searches)
                              ) {
                                  return search;
                              }
                              return false;
                          })
                          .map((product) => (
                              <CardItems
                                  product={product}
                                  Change={setChange}
                                  DataBase={DataBase}
                                  saved={saved}
                                  item
                                  key={product._id}
                              />
                          ))
                    : Array.from(new Array(20)).map((n, i) => (
                          <Stack spacing={1} id="skeletonCard" key={i}>
                              <Skeleton
                                  variant="rectangular"
                                  width={"100%"}
                                  height={"100%"}
                              />
                          </Stack>
                      ))}
            </Grid>
        </Grid>
    );
};

export default ProductComponent;
