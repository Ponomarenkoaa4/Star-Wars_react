import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { withErrorApi } from "@hoc-helpers/withErrorApi";
import { getApiResource } from "@utils/network";
import { API_SEARCH } from "@constants/api";
import { getPeopleId, getPeopleImg } from "@services/getPeopleData";
import SearchPageInfo from "@components/SearchPage/SearchPageInfo";
import UiInput from "@components/Ui/UiInput/UiInput";

import styles from "./SearchPage.module.css";

const SearchPage = ({ setErrorApi }) => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [people, setPeople] = useState([]);

  const getResponse = async (param) => {
    const res = await getApiResource(API_SEARCH + param);

    if (res) {
      const peopleList = res.results.map(({ name, url }) => {
        const id = getPeopleId(url);
        const img = getPeopleImg(id);
        return {
          id,
          name,
          img,
        };
      });
      setPeople(peopleList);
      setErrorApi(false);
    } else {
      setErrorApi(true);
    }
  };

  useEffect(() => {
    getResponse("");
  }, []);

  const debouncedGetResponse = useCallback(
    debounce((value) => getResponse(value), 300),
    []
  );

  const handleInputChange = (value) => {
    setInputSearchValue(value);
    debouncedGetResponse(value);
  };

  return (
    <div>
      <h1 className="header__text">Search</h1>
      <UiInput
        value={inputSearchValue}
        handleInputChange={handleInputChange}
        placeholder="Input characters name"
        classes={styles.input__search}
      />
      <SearchPageInfo people={people} />
    </div>
  );
};

SearchPage.propTypes = {
  setErrorApi: PropTypes.func,
};

export default withErrorApi(SearchPage);
