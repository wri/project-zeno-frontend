import { Box, List } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { currentUserPersonaAtom } from "../../atoms";
import { useState } from "react";
import MessageOutWrapper from "./wrapper";
import QueryButton from "./QueryButton";

export const personas = [
  {
    title: "🌳 Conservation Manager",
    text: "I am a conservation manager responsible for overseeing a network of Key Biodiversity Areas. I have basic GIS skills, I am comfortable visualising data but not conducting advanced analysis. I need to identify and understand threats, such as illegal logging or habitat degradation, and monitor changes in ecosystem health over time to allocate resources effectively and plan conservation interventions.",
  },
  {
    title: "🌱 Program Manager",
    text: "I am a program manager implementing nature-based solutions projects focused on agroforestry and land restoration. I am comfortable using tools like QGIS for mapping and visualisation. I need to track project outcomes, such as tree cover gain and carbon sequestration, and prioritise areas for intervention based on risks like soil erosion or forest loss.",
  },
  {
    title: "🏦 Investment Analyst",
    text: "I am an investment analyst for an impact fund supporting reforestation and agroforestry projects. I have limited GIS skills and rely on intuitive dashboards or visualisations to understand geospatial insights. I need independent geospatial insights to monitor portfolio performance, assess project risks, and ensure investments align with our net-zero commitments.",
  },
  {
    title: "🚜 Sustainability Manager",
    text: "I am a sustainability manager responsible for ensuring our company’s agricultural supply chains meet conversion-free commitments. I have limited GIS skills and can only use simple web-based tools or dashboards. I need to monitor and address risks such as land conversion to maintain compliance and support sustainable sourcing decisions.",
  },
  {
    title: "⚖️ Advocacy Program Manager",
    text: "I am an advocacy program manager for an NGO working on Indigenous Peoples’ land rights. I have basic GIS skills, enabling me to visualise data but not perform advanced analysis. I need to use data to highlight land use changes, advocate for stronger tenure policies, and empower local communities to monitor their territories.",
  },
  {
    title: "📰 Journalist",
    text: "I am a journalist covering environmental issues and corporate accountability, with basic GIS skills that enable me to interpret geospatial data by eye but not produce charts or insights myself. I need reliable, accessible data to track whether companies are meeting their EU Deforestation Regulation (EUDR) commitments, identify instances of non-compliance, and write compelling, data-driven stories that hold businesses accountable for their environmental impact.",
  },
];

/**
 *
 * Persona Select component
 * Takes options and presents them to the user
 * Once an option is selected, create a POST to the server
 * with the selected option
 *
 */
function PersonaSelect() {
  const [userPersona, setUserPersona] = useAtom(currentUserPersonaAtom);
  const [selectedTitle, setSelectedTitle] = useState(null);
  return (
    <MessageOutWrapper>
      Start by selecting a role that best describes you:
      <List.Root
        listStyle="none"
        pl="0"
        display="flex"
        flexDir="row"
        flexWrap="wrap"
        gap="2"
        my="1"
      >
        {personas.map(({ title, text }) => {
          return (
            <List.Item key={title} m="0">
              <QueryButton
                fontWeight={selectedTitle === title ? "bold" : "normal"}
                background={selectedTitle === title ? "bg.info" : "initial"}
                selected={selectedTitle === title}
                clickHandler={() => {
                  setSelectedTitle(title);
                  setUserPersona(text);
                }}
              >
                {title}
              </QueryButton>
            </List.Item>
          );
        })}
      </List.Root>
      {selectedTitle && (
        <Box
          bg="bg.panel"
          p="3"
          mt="2"
          rounded="md"
          borderWidth="1px"
          borderColor="border.info"
        >
          <strong>{selectedTitle}</strong>
          <br />
          {userPersona}
        </Box>
      )}
    </MessageOutWrapper>
  );
}

export default PersonaSelect;
