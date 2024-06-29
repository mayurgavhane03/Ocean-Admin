import React from "react";
import { NavLink } from "react-router-dom";

const DisclaimerPolicy = () => {
  return (
    <div className="bg-black ">
        <h1 className="text-4xl   text-white  ml-36 pt-6 font-bold mb-4">Disclaimer</h1>
    <div className=" text-white flex items-center justify-center min-h-screen p-8">
      
      <div className="max-w-3xl">
      
        <p className="mb-4 text-center">
          <span className="text-2xl font-bold">
            All My Post are Free Available On INTERNET Posted By Somebody Else,
          </span>
          <br />
          I’m Not VIOLATING Any COPYRIGHTED LAW. If Anything Is Against LAW,
          Please Notify Me So That It Can Be Removed.
        </p>
        <p className="mb-4 text-center">
          <a href="#contact-us" className="text-blue-500">
            Contact us
          </a>
        </p>
        <p className="mb-4 text-center">
          We remove postings as soon as we can, usually within 1-4 days. Thank
          you for your understanding.
        </p>
        <p className="text-2xl font-bold mb-4 text-center">
          Copyrighted Contents???
        </p>
        <p className="mb-4 text-center">
          What to do if I want you to remove certain copyrighted comments from
          your website?
          <br />
          Please note that we do not host any copyrighted content on this
          website. The comments (text) contains only information shared by users
          that do not contain data that might be copyrighted in any way.
          However, we offer a service to remove comments from our website if the
          copyright holder of the content requests so. These removal requests
          are only valid if:
        </p>
        <ul className="list-disc list-inside mb-4 text-left mx-auto max-w-lg">
          <li>
            You are, or your company is, the copyright holder of the content in
            question.
          </li>
          <li>You provide the exact URLs to the comment.</li>
          <li>You provide the complete name(s) of the content in question.</li>
          <li>
            You send the removal request using a verifiable email address (e.g.
            address@yourname/yourcompany.com).
          </li>
        </ul>
        <p className="mb-4 text-center">
          <a href="#how-to-download" className="text-blue-500 font-bold"></a>
          <NavLink
            to="/how-to-download"
            className="text-blue-500 font-bold"
            activeClassName="bg-gray-700 text-white"
          >
            [How to Download]
          </NavLink>
        </p>
        <p className="mb-4 text-center">
          If your request complies with all of these rules, send a mail with{" "}
          <a href="#contact-us-page" className="text-blue-500">
            Contact us page
          </a>
          . Please keep the correspondence polite.
          <br />
          We remove postings as soon as we can, usually within 4 days. Keep in
          mind that we can only handle removal requests that comply with the
          above rules.
        </p>
      </div>
    </div>
    </div>
  );
};

export default DisclaimerPolicy;
