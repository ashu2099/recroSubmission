import { React, useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";

import { fetchCards, showLoader } from "../../store/actions/onlySingleActions";

import { CONSTANTS } from "../../CONSTANTS";

import "./CardList.css";
import CardThumbnail from "../cardThumbnail/CardThumbnail";

export default function CardList() {
  const actionDispatcher = useDispatch();

  const [listOfCards, setListOfCards] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);

  const intersetionDetector = useRef(null);

  useEffect(() => {
    if (pageNumber > 0) {
      let startIndex = (pageNumber - 1) * CONSTANTS.CARD_LIMIT;
      actionDispatcher(showLoader(true));

      actionDispatcher(fetchCards(startIndex))
        .then((rsData) => {
          setListOfCards((prevList) => prevList.concat(rsData));
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          actionDispatcher(showLoader(false));
          setIsFetching(false);
        });
    }
  }, [pageNumber,actionDispatcher]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.isIntersecting && !isFetching) {
        setIsFetching(true);
        setPageNumber((prev) => prev + 1);
      }
    }, options);

    const currentIntersectionRef = intersetionDetector?.current;

    if (!!currentIntersectionRef) {
      observer.observe(currentIntersectionRef);
    }

    return () => observer.unobserve(currentIntersectionRef);
  }, [intersetionDetector, isFetching]);

  return (
    <div>
      <h1 className="list-title">Cards:</h1>
      <div className="row">
        {listOfCards.map((x) => (
          <CardThumbnail key={x.id} cardTitle={x.title} cardBody={x.body} />
        ))}
      </div>
      <div ref={intersetionDetector} className="intersector"></div>
    </div>
  );
}
