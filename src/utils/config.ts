import { configType } from '../types/config';

const config: configType = {
  PORT: 3001,
  mongoPath: 'mongodb://skydrop:ulysseetchatgptnefontq1@127.0.0.1:27017/',
  jwtSecret:
    'a62dc8099acd7064814f6555325e4fdb7c4a6ade1d4a321449a00421ead8108e1074e639efe3ec4e195a93cdc4e75c14edea0aeef98ada8217344562ed3489d4b584fbfa7fe99c738eeb17d5fb1261667e3b00f91cd838d702d5b9dba26e396b8905dbd2be48c433b495a377d971ccf7932213d1ec1068525afd53444eb28a94d79b7214fc43ae85b508bd8fd968ce9b123a4893be11774bdecb603bd6fb626cd8780f9e3b786d3c5f18212070889278af0eb59c93b0c044f755aa80fbba34abbd50ad33efaf330672fe54dbeb664786515fcb95b55102417cef54932a8555cca5d7615fb245dbb49deed504ff117fc7d2cadea5f1ba694cc851daca75e664ef',
  jwtSession: { session: false },
};

export { config };
