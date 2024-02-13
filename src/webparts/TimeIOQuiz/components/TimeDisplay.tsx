import * as React from 'react';
import { useState, useEffect } from 'react';
import '../components/TimeApiComponentStyles.css';

interface TimeApiComponentsProps {
    userInfo: {
      name: string;
      number: string;
      email: string;
      country: string;
    } | null;
  }
  

  const TimeApiComponents: React.FC<TimeApiComponentsProps> = ({ userInfo }) => {
    if (userInfo) {
      }
    const [currentTime, setCurrentTime] = useState('');
    const [dayLightSaving, setDayLightSaving] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [convertTime, setConvertTime] = useState('');
    const [timeZoneList, setTimeZoneList] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [selectedTimeZone, setSelectedTimeZone] = useState('Europe/London');
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const questions = [
        {
            questionText: 'Is Day Light saving is active in Amsterdam?',
            answerOptions: [
                { answerText: 'Yes', isCorrect: false },
                { answerText: 'No', isCorrect: checkAnswer() },
            ],
        },
        {
            questionText: 'What will be the Day on 08-02-2024?',
            answerOptions: [
                { answerText: 'Thursday', isCorrect: checkAnswer() },
                { answerText: 'Sunday', isCorrect: false },
                { answerText: 'Friday', isCorrect: false },
                { answerText: 'Monday', isCorrect: false },
            ],
    
        },
        {
            questionText: `What time will it be in Asia/Tokyo when it's 14:00 on 2023-10-10 in Europe/London?`,
            answerOptions: [
                { answerText: '21:30', isCorrect: false },
                { answerText: '22:00', isCorrect: checkAnswer() },
                { answerText: '21:00', isCorrect: false },
                { answerText: '22:30', isCorrect: false },
            ],
            
          }

        // Add more questions here
    ];

    const handleAnswerOptionClick = (isCorrect: any) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    useEffect(() => {
        fetchTimeZones(),
        convertTimeZones(),
        fetchTimeData(selectedTimeZone)
        fetchTimeZone(selectedTimeZone);
    }, [selectedTimeZone]);

    const fetchTimeZones = () => {
        const apiUrl = `https://timeapi.io/api/TimeZone/AvailableTimeZones`;

        fetch(`${corsProxy}${apiUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setTimeZoneList(data);
            })
            .catch(error => {
                console.error('Error fetching time data:', error);
            });

    };
    const fetchTimeData = (timeZone: string) => {
        const apiUrl = `https://timeapi.io/api/Time/current/zone?timeZone=${timeZone}`;

        fetch(`${corsProxy}${apiUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setCurrentTime(data.dateTime);
                setCurrentDate(data.date);
                setDayOfWeek(data.dayOfWeek);
            })
            .catch(error => {
                console.error('Error fetching time data:', error);
            });
    };

    const fetchTimeZone = (timeZone: string) => {
        const apiUrl = `https://timeapi.io/api/TimeZone/zone?timeZone=${timeZone}`;

        fetch(`${corsProxy}${apiUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isDayLightSavingActive === false)
                    setDayLightSaving('No');
                else
                    setDayLightSaving('Yes');
            })
            .catch(error => {
                console.error('Error fetching time data:', error);
            });
    };

    const handleTimeZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newTimeZone = event.target.value;
        setSelectedTimeZone(newTimeZone);
        fetchTimeData(newTimeZone);
    };
    function checkAnswer() {

        if('22:00' === convertTime)
            return true;
        else if('Thusrday' === dayOfWeek)
            return true;
        else if('No' === dayLightSaving)
            return true;
    }
    const convertTimeZones = () => {
        
        const apiUrl = `https://timeapi.io/api/Conversion/ConvertTimeZone`;
        const requestBody = {
            fromTimeZone: 'Europe/London',
            toTimeZone: 'Asia/Tokyo',
            dateTime: '2023-10-10 14:00:00',
            dstAmbiguity: ''
        };
        fetch(`${corsProxy}${apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                setConvertTime(data.conversionResult.time);
            })
            .catch(error => {
                console.error('Error fetching time data:', error);
            });

    };
    // const submitToSharePoint = async (data) => {
    //     const apiUrl = `https://mayusys.sharepoint.com/sites/codedemo/_api/web/lists/getbytitle('QuizSubmissions')/items`;
    //     const spHeaders = {
    //         "Accept": "application/json;odata=verbose",
    //         "Content-Type": "application/json;odata=verbose",
    //         "Authorization": "Bearer " + accessToken
    //     };
    //     const spBody = JSON.stringify({
    //         __metadata: { type: "SP.Data.QuizSubmissionsListItem" }, 
    //         Title: data.userInfo.name, // User's name
    //         Number: data.userInfo.number, // User's number
    //         Email: data.userInfo.email, // User's email
    //         Country: data.userInfo.country, // User's country
    //         QuizAnswers: JSON.stringify(data.answers) // Quiz answers as a JSON string
    //     });
    
    //     try {
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             headers: spHeaders,
    //             body: spBody
    //         });
    
    //         if (!response.ok) {
    //             throw new Error(`SharePoint submission failed: ${response.statusText}`);
    //         }
    
    //         const responseData = await response.json();
    //         console.log('Successfully submitted to SharePoint:', responseData);
    //     } catch (error) {
    //         console.error('Error submitting to SharePoint:', error);
    //     }
    // };
    
    return (
        <div className='app'>
            <div className='selection'>
                <h2>Select your TimeZone</h2>
                <select onChange={handleTimeZoneChange} value={selectedTimeZone}>
                    {timeZoneList.map((timeZone, index) => (
                        <option key={index} value={timeZone}>
                            {timeZone}
                        </option>
                    ))}
                </select>
                <p>Current Date: {currentDate ? currentDate : 'Loading...'}</p>
                <p>Current Time: {currentTime ? currentTime : 'Loading...'}</p>

            </div>
            {showScore ? (
                <div className='score-section'>
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} key={index}>
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                    
                </>
            )}

        </div>
    );
};

export default TimeApiComponents;


