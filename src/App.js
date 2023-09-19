import React, { useState, useEffect } from "react"; // Thư viện giúp cập nhật trạng thái
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [output, setOutput] = useState("");
  const [executionTime, setExecutionTime] = useState(0);
  const [algorithmData, setAlgorithmData] = useState([]);
  const [algorithmExplanation, setAlgorithmExplanation] = useState("");
  const [isDataCollected, setIsDataCollected] = useState(false);
  const [fastestAlgorithm, setFastestAlgorithm] = useState(""); // Biến state cho thuật toán nhanh nhất
  const [slowestAlgorithm, setSlowestAlgorithm] = useState("");
  const [completedAlgorithms, setCompletedAlgorithms] = useState([]);

  useEffect(() => {
    if (completedAlgorithms.length === 5) {
      //check đủ 5 thuât toán rồi đánh giá kết quả
      checkFastestSlowestAlgorithm();
    }
  }, [completedAlgorithms]);

  const generateRandomCharacter = () => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  };

  const generateRandomString = () => {
    const length = Math.floor(Math.random() * 5) + 1;
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += generateRandomCharacter();
    }
    return randomString;
  };

  const generateArray = () => {
    // Tạo mảng
    const newArray = [];
    for (let i = 0; i < 1000; i++) {
      newArray.push(generateRandomString());
    }
    setArray(newArray);
    setOutput("Mảng đã tạo: [" + newArray.join(", ") + "]");
    setAlgorithmExplanation("");
  };

  const bubbleSort = (arr) => {
    // Sắp xếp mảng sử dụng thuật toán Bubble Sort
    for (let i = 0; i < arr.length; i++) {
      for (let j = arr.length - 1; j > i; j--) {
        if (arr[j] < arr[j - 1]) {
          [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        }
      }
    }
  };

  const selectionSort = (arr) => {
    // Sắp xếp mảng sử dụng thuật toán Selection Sort
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
  };

  const insertionSort = (arr) => {
    // Sắp xếp mảng sử dụng thuật toán Insertion Sort
    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
  };

  const mergeSort = (arr) => {
    // Sắp xếp mảng sử dụng thuật toán Merge Sort
    if (arr.length <= 1) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
  };

  const merge = (left, right) => {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  };

  const quickSort = (arr) => {
    // Sắp xếp mảng sử dụng thuật toán Quick Sort
    if (arr.length <= 1) {
      return arr;
    }
    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return quickSort(left).concat(pivot, quickSort(right));
  };

  const sortArray = async (algorithm) => {
    const newArray = [...array];
    let explanation = "";
    const startTime = performance.now();
    switch (algorithm) {
      case "bubbleSort":
        await bubbleSort(newArray);
        explanation =
          "Bubble Sort(sắp xếp nổi bọt) là một thuật toán đơn giản sắp xếp mảng bằng cách so sánh lần lượt các cặp phần tử liền kề và đổi chỗ chúng nếu cần thiết.";
        break;
      case "selectionSort":
        await selectionSort(newArray);
        explanation =
          "Sắp xếp chọn là một thuật toán sắp xếp đơn giản, dựa trên việc so sánh tại chỗ. Chọn phần tử nhỏ nhất trong n phần tử ban đầu, đưa phần tử này về vị trí đúng là đầu tiên của dãy hiện hành. Sau đó không quan tâm đến nó nữa, xem dãy hiện hành chỉ còn n-1 phần tử của dãy ban đầu, bắt đầu từ vị trí thứ 2.";
        break;
      case "insertionSort":
        await insertionSort(newArray);
        explanation =
          "Insertion Sort là một thuật toán sắp xếp bằng cách chia mảng thành hai phần: một phần đã sắp xếp và một phần chưa sắp xếp. Thuật toán lấy lần lượt các phần tử từ phần chưa sắp xếp và đặt chúng vào vị trí phù hợp trong phần đã sắp xếp.";
        break;
      case "mergeSort":
        await mergeSort(newArray);
        explanation =
          "Merge Sort là một thuật toán sắp xếp đệ quy, nó chia mảng thành nhiều phần nhỏ, sắp xếp từng phần nhỏ và sau đó kết hợp chúng lại với nhau để tạo ra mảng đã sắp xếp.";
        break;
      case "quickSort":
        await quickSort(newArray);
        explanation =
          'Quick Sort là một thuật toán sắp xếp đệ quy, nó chọn một phần tử gọi là "pivot" và chia mảng thành hai phần: một phần chứa các phần tử nhỏ hơn pivot và một phần chứa các phần tử lớn hơn pivot, sau đó sắp xếp từng phần và kết hợp lại với nhau.';
        break;
      default:
        break;
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    setArray(newArray);
    setOutput("Mảng đã sắp xếp: [" + newArray.join(", ") + "]");
    setAlgorithmExplanation(explanation);
    setExecutionTime(executionTime.toFixed(2)); // Làm tròn thời gian sau dấu chấm 2 chữ số
    debugger;
    setAlgorithmData([...algorithmData, { algorithm, executionTime }]);//Thêm phần tử vào mảng algorithmData có 2 thuộc tính algorithm và executionTime
    setCompletedAlgorithms([
      ...completedAlgorithms,
      { algorithm, executionTime },
    ]);
  };

  const checkFastestSlowestAlgorithm = () => {
    debugger;
    let fastestTime = Infinity;
    let slowestTime = -Infinity;
    let fastestAlgorithm = "";
    let slowestAlgorithm = "";

    completedAlgorithms.forEach((data) => {
      const { algorithm, executionTime } = data;
      // So sánh thời gian chạy với thuật toán nhanh nhất và chậm nhất
      if (executionTime < fastestTime) {
        fastestAlgorithm = algorithm;
        fastestTime = executionTime;
      }
      if (executionTime > slowestTime) {
        slowestAlgorithm = algorithm;
        slowestTime = executionTime;
      }
    });

    setFastestAlgorithm(fastestAlgorithm);
    setSlowestAlgorithm(slowestAlgorithm);
  };
  const renderAlgorithmTable = () => {
    debugger;
    return (
      <table>
        <thead>
          <tr>
            <th>Thuật toán</th>
            <th>Thời gian thực hiện (ms)</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {algorithmData.map((data, index) => (
            <tr key={index}>
              <td>{data.algorithm}</td>
              <td>{data.executionTime.toFixed(2)}</td>
              <td>
                <button onClick={() => deleteRow(index)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const deleteRow = (index) => {
    const newData = [...algorithmData];
    newData.splice(index, 1); // Loại bỏ dòng tại chỉ mục `index` từ mảng dữ liệu.
    setAlgorithmData(newData); // Cập nhật mảng dữ liệu.
  };
  return (
    <div className="App">
      <div className="left-column">
        <h1>Ứng dụng sắp xuất chữ bằng thuật toán</h1>
        <button className="create-array-button" onClick={generateArray}>
          <span role="img" aria-label="Plus Icon">
            ➕
          </span>{" "}
          Tạo Mảng
        </button>
        <button onClick={() => sortArray("bubbleSort")}>
          Sắp xếp (Bubble Sort)
        </button>
        <button onClick={() => sortArray("selectionSort")}>
          Sắp xếp (Selection Sort)
        </button>
        <button onClick={() => sortArray("insertionSort")}>
          Sắp xếp (Insertion Sort)
        </button>
        <button onClick={() => sortArray("mergeSort")}>
          Sắp xếp (Merge Sort)
        </button>
        <button onClick={() => sortArray("quickSort")}>
          Sắp xếp (Quick Sort)
        </button>
        <div id="output">{output}</div>
      </div>
      <div className="right-column">
        <h1>Giải thích thuật toán</h1>
        <div id="algorithmExplanation">{algorithmExplanation}</div>
        <div id="algorithmTable">
          <h2>Bảng đánh giá thuật toán</h2>
          {renderAlgorithmTable()}
        </div>
        <div className="right-column">
          <h2>Thuật toán nhanh nhất: {fastestAlgorithm}</h2>
          <h2>Thuật toán chậm nhất: {slowestAlgorithm}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
