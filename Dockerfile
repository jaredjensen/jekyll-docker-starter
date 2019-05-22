FROM jekyll/builder:3.8 as builder
WORKDIR /build
COPY Gemfile Gemfile.lock package.json package-lock.json gulpfile.js ./
COPY src src
RUN bundle install && npm i
RUN npm run build

FROM nginx:alpine as runner
COPY --from=builder /build/src/_site /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]