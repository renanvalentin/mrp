FROM node:9.3.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

RUN mkdir $HOME/.npm-global
ENV NPM_CONFIG_PREFIX=$HOME/.npm-global

USER app
WORKDIR $HOME/mrp

RUN mkdir -p $HOME/.flow-typed/repo && \
    cd $HOME/.flow-typed/repo && \
    git clone https://github.com/flowtype/flow-typed.git . && \
    cd $HOME/mrp

ADD ./package.json ./yarn.* ./
ADD ./.flowconfig ./

USER root
RUN chown -R app:app $HOME/*
USER app

RUN yarn && yarn cache clean

EXPOSE 3000