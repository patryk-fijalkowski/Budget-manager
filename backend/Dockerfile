FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env

EXPOSE 5000
WORKDIR /backend

COPY ./backend.csproj /backend

RUN dotnet restore "./backend.csproj"

COPY ./. .
RUN dotnet publish "./backend.csproj" -c Release -o out

FROM mcr.microsoft.com/dotnet/sdk:5.0
WORKDIR /backend
COPY --from=build-env /backend/out .

ENV ASPNETCORE_URLS http://*:5000

ENTRYPOINT ["dotnet", "backend.dll"]
