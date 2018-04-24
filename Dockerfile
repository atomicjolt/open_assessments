FROM kkarczmarczyk/node-yarn:7.4

RUN mkdir /open_assessments
COPY . /open_assessments
WORKDIR /open_assessments
RUN rm .git
RUN rm *.lock

RUN yarn install

EXPOSE 8080

CMD ["yarn", "hot"]