#!/usr/bin/env node

import { exec } from "child_process";
import figlet from "figlet";
import inquirer from "inquirer";

/**
 * 初期表示するAAを作成
 */
const createAA = () => {
  return new Promise((resolve, reject) => {
    figlet("Yahho!", (err, data) => {
      if (err) {
        reject();
        return;
      }
      resolve(data);
    });
  });
};

/**
 * 本体
 */
const main = async () => {
  // AA
  const data = await createAA();
  console.log(data);

  // ターミナルで対話する
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "installType",
      message: "Select the packages",
      choices: ["React", "Next"],
    },
    {
      type: "input",
      name: "projectName",
      message: "Project Name?",
    },
  ]);

  // コマンド実行のひな形
  const execPromise = (command, options = {}) => {
    return new Promise((resolve, reject) => {
      exec(command, options, (error, stdout, stderr) => {
        if (error) {
          console.log(`Error: ${error.message}`);
          return reject(error);
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        resolve(stdout);
      });
    });
  };

  /**
   * 対話結果によってインストール対象を分岐
   */

  if (answer.installType === "React") {
    // React選択のとき
    try {
      // テンプレートをGit clone
      await execPromise(
        `git clone https://github.com/Naka-nishi-s/Template-place-React.git ${answer.projectName}`
      );

      console.log("クローン完了");

      // ディレクトリ移動
      process.chdir(answer.projectName);
      console.log("移動");

      // オリジン削除
      await execPromise("git remote remove origin");
      console.log("オリジン削除完了");

      // パッケージのインストール
      await execPromise("npm i");
      console.log("パッケージインストール完了");

      console.log("すべての手順が完了しました。");
      console.log("Enjoy Hacking!");
    } catch (err) {
      console.error(`Failed... Err:${err.message}`);
    }
  }

  if (answer.installType === "Next") {
    // Next選択のとき
    try {
      // テンプレートをGit clone
      await execPromise(
        `git clone https://github.com/Naka-nishi-s/Template-place.git ${answer.projectName}`
      );

      console.log("クローン完了");

      // ディレクトリ移動
      process.chdir(answer.projectName);
      console.log("移動");

      // オリジン削除
      await execPromise("git remote remove origin");
      console.log("オリジン削除完了");

      // パッケージのインストール
      await execPromise("npm i");
      console.log("パッケージインストール完了");

      console.log("すべての手順が完了しました。");
      console.log("Enjoy Hacking!");
    } catch (err) {
      console.error(`Failed... Err:${err.message}`);
    }
  }
};

main();
