import { words } from "../words";
import { useState, useEffect } from "react";
import { Box, Divider, Heading, useToast } from "@chakra-ui/react";
import { Button } from "./components/Button";
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

export const Home = () => {
  const [options, setOptions] = useState([]);
  const [ask, setAsk] = useState({});
  const [answer, setAnswer] = useState({});
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const getTime = () =>
      setTimeout(function () {
        const { ask, options } = getQuizz(words.length);
        setOptions(options);
        setAsk(ask);
        setAnswer({});
      }, 2000);
    getTime();
    return () => clearInterval();
  }, [update]);

  const toast = useToast();

  return (
    <Box width="100%">
      <Heading display="flex" justifyContent="center">
        {ask.word}
      </Heading>

      <Divider />

      {options.map((option) => (
        <Button
          key={JSON.stringify(option)}
          disabled={!!answer.id}
          sucess={
            option.id === answer.id ? answer.word === ask.word : undefined
          }
          onClick={() => {
            setAnswer(option);
            setUpdate(!update);

            const answerIsCorrect = answer.id === ask.id;

            if (!answerIsCorrect) {
              toast({
                title: ask.translation,
                status: "success",
                duration: 1500,
                isClosable: true,
              });
            }
          }}
        >
          {option.translation}
        </Button>
      ))}
    </Box>
  );
};
