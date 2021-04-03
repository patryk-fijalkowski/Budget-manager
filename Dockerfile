FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env

EXPOSE 5000

COPY /eFIRDS-api/*.sln ./
COPY /eFIRDS-api/eFIRDS-api/*.csproj ./eFIRDS-api/

RUN dotnet restore 

COPY /eFIRDS-api/ .

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/sdk:5.0
WORKDIR /eFIRDS-api
COPY --from=build-env ./out .

ENV ASPNETCORE_URLS http://*:5000

ENTRYPOINT [ "dotnet", "eFIRDS-api.dll" ]
