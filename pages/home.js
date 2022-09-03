import { words } from "../words";
import { useState, useEffect } from "react";
import { Box, Divider, Button, Heading } from "@chakra-ui/react";

function randomNumber(minRange, maxRange) {
  return Math.floor(Math.random() * maxRange) + minRange;
}

function getElement(list, position) {
  if (position < 0 || position >= list.length)
    throw { error: "position out of range" };

  return list[position];
}

function getQuizz() {
  const positions = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * words.length)
  );

  const askPosition = positions[randomNumber(0, 5)];

  return {
    ask: getElement(words, askPosition),
    options: positions.map((position) => getElement(words, position)),
  };
}

const correct = {
  colorScheme: "green",
};

const wrong = {
  colorScheme: "red",
};

export const Home = () => {
  const [options, setOptions] = useState([]);
  const [ask, setAsk] = useState({});
  const [answer, setAnswer] = useState({});
  const [update, setUpdate] = useState(false);
  const [sty, setSty] = useState({});

  useEffect(() => {
    setTimeout(function () {}, 2000);
    const { ask, options } = getQuizz(words.length);
    setOptions(options);
    setAsk(ask);
    // setAnswer({});
  }, [update]);

  const style = (option) => {
    if (!answer.id) return;
    if (answer.word === ask.word) return answer.id === option.id && correct;
    return answer.id === option.id && wrong;
  };

  return (
    <Box width="100%">
      <Heading display="flex" justifyContent="center">
        {ask.word}
      </Heading>

      <Divider />

      {options.map((option) => (
        <Button
          colorScheme="teal"
          width="100%"
          margin={2}
          key={option}
          {...style(option)}
          onClick={() => {
            setAnswer(option);

            setUpdate(!update);
          }}
        >
          {option.translation}
        </Button>
      ))}
    </Box>
  );
};
