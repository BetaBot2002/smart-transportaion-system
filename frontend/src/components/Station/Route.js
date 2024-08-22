import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import StationSearch from './StationSearch.js';
import TrainSearch from './TrainSearch.js';
import SearchHistory from './SearchHistory.js';

export default function RoutePage() {
  return (
    <Box p={4} mt={10} maxW="lg" mx="auto">
      <Tabs size='md' align='center' variant='enclosed'>
        <TabList>
          <Tab>Station Search</Tab>
          <Tab>Train Search</Tab>
          <Tab>Search History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StationSearch />
          </TabPanel>
          <TabPanel>
            <TrainSearch />
          </TabPanel>
          <TabPanel>
            <SearchHistory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
